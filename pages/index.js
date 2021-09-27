import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { insertRank } from "./LexoRank";
// fake data generator
const items = [];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  if (startIndex === endIndex) return list;
  const items = Array.from(list);
  let prevRank;
  let nextRank;
  if (startIndex > endIndex) {
    prevRank = (items[endIndex - 1] && items[endIndex - 1].priority) || "";
    nextRank = (items[endIndex] && items[endIndex].priority) || "";
  } else {
    prevRank = (items[endIndex] && items[endIndex].priority) || "";
    nextRank = (items[endIndex + 1] && items[endIndex + 1].priority) || "";
  }
  const generatedRank = insertRank(prevRank, nextRank);
  items[startIndex].priority = generatedRank;
  return items.sort((a, b) => a.priority.localeCompare(b.priority));
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
var nroCollections = 0;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  createNewObj = () => {
    nroCollections += 1;
    const { items } = this.state;
    const item = {
      cid: String(new Date().getTime()),
      title: 'My Collection'+String(new Date().getTime()),
      description: "Test",
      priority: insertRank(items.length && items[items.length - 1].priority),
      numVideos: 2,
    };
    this.setState({ items: [...items, item] });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <React.Fragment>
        <button onClick={this.createNewObj}> Add {nroCollections} </button>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable
                    key={item.cid}
                    draggableId={item.cid}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                       {item.title} - rank:{item.priority}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
