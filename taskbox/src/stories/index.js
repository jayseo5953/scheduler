/* We need to import React because we are using JSX. */
import React from "react";

/* The storiesOf function from the React version of Storybook is used to start a series of stories. */
import { storiesOf } from "@storybook/react";

/* The action function from the Storybook actions addon lets verify that our component triggers event handlers correctly. */
import { action } from "@storybook/addon-actions";

/* Storybook is a test environment. We need to import the component that we are testing. */
import Task from "./Task";

/* This is fake data that we can pass as a prop to each version of our Task. */
export const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0)
};

/* We pass these actions below using the spread operator */
export const actions = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

/* We start a sequence of stories, but calling the imported `storiesOf` function. */
storiesOf("Task", module)
  /* Our first story, called 'default', renders a basic Task with both actions. */
  .add("default", () => <Task task={task} {...actions} />)
  /* Our second story, called 'pinned', clones the task, and sets its state to "TASK_PINNED". */
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  /* Our third story, called 'archived', clones the task, and sets its state to "TASK_ARCHIVED". */
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ));