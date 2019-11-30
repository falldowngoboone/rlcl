import React from 'react';
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import styled from 'styled-components';

import { ActionableItem } from './service/actionable-items';

import { Button } from './Button';

type ItemsListProps = {
  isEditable: boolean;
  items: ActionableItem[];
  onDoneToggle: (item: ActionableItem) => void;
  onRemove: (item: ActionableItem) => void;
};

export function ItemList({
  items = [],
  isEditable,
  onDoneToggle,
  onRemove,
}: ItemsListProps) {
  return (
    <Droppable droppableId="item">
      {(provided: DroppableProvided) => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot
              ) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5em',
                    boxShadow: snapshot.isDragging
                      ? '0 5px 15px 0 rgba(0, 0, 0, 0.2)'
                      : 'none',
                    boxSizing: 'border-box',
                    display: 'block',
                    ...provided.draggableProps.style,
                  }}
                >
                  <Flex>
                    <DragHandle
                      isEditable={isEditable}
                      {...provided.dragHandleProps}
                    >
                      ☰
                    </DragHandle>
                    <CheckWrapper>
                      <Checkbox
                        checked={item.done}
                        id={`item-${item.id}-checked`}
                        name="itemDone"
                        onChange={event => {
                          onDoneToggle({
                            ...item,
                            done: event.currentTarget.checked,
                          });
                        }}
                        aria-label={`Mark ${item.value} as ${
                          item.done ? 'unpacked' : 'packed'
                        }`}
                      />
                      <Label htmlFor={`item-${item.id}-checked`}>
                        {item.value}
                      </Label>
                    </CheckWrapper>
                    {isEditable && (
                      <Button
                        onClick={() => {
                          onRemove(item);
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </Flex>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

const List = styled.ol`
  list-style-type: none;
  padding: 0;

  &:empty {
    display: none;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 1.25em;
  width: 1.25em;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  vertical-align: text-bottom;
  flex: 0 0 auto;
  appearance: none;
  border: 0.125em solid black;
  border-radius: 50%;
  position: relative;
  vertical-align: top;

  &:checked {
    background-color: black;
  }

  &:checked::after {
    content: '';
    display: block;
    border: 0.1875em solid white;
    border-top: none;
    border-right: none;
    width: 0.5em;
    height: 0.25em;
    transform: translate(-50%, -65%) rotate(-45deg);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const CheckWrapper = styled.span`
  padding-left: 2em;
  flex-grow: 1;

  & > :first-child {
    margin-left: -2em;
  }
`;

const Label = styled.label`
  flex: 1 1 auto;
  padding: 0.25em 0.5em;
  line-height: 1;
  display: inline-block;
  vertical-align: top;
`;

const DragHandle = styled(Button).attrs({
  as: 'span',
})<{ isEditable: boolean }>`
  ${({ isEditable }) => !isEditable && `display: none;`}
  color: #ccc;

  @media screen and (pointer: fine) {
    &:hover {
      color: inherit;
    }

    &:active {
      color: inherit;
      background-color: white;
    }
  }
`;
