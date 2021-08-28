import * as React from "react";

type ListNameProps = {
  as?: React.ElementType;
  initialValue: string;
  onChange: (newContent: string) => void;
};

function ContentEditable({
  as: Component = "div",
  initialValue,
  onChange,
}: ListNameProps) {
  const editBoxRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const { current: editableBox } = editBoxRef;
    if (editableBox !== null && document.activeElement !== editableBox) {
      editableBox.textContent = initialValue;
    }
  }, [initialValue]);

  const handleInput = React.useCallback(
    (event: React.SyntheticEvent<HTMLHeadingElement>) => {
      const newContent = event.currentTarget.textContent?.trim();

      if (newContent && newContent !== initialValue) {
        onChange(newContent || "");
      }
    },
    [onChange, initialValue]
  );

  const handleBlur = React.useCallback(() => {
    const { current: editableBox } = editBoxRef;
    if (editableBox && editableBox.textContent) {
      editableBox.textContent = editableBox.textContent.trim();
    }
  }, []);

  React.useEffect(() => {
    const { current: editableBox } = editBoxRef;

    editableBox?.addEventListener("beforeinput", handleBeforeInput);

    return () => {
      editableBox?.removeEventListener("beforeinput", handleBeforeInput);
    };
  }, []);

  return (
    <Component
      contentEditable={true}
      suppressContentEditableWarning={true}
      ref={editBoxRef}
      onBlur={handleBlur}
      onInput={handleInput}
    />
  );
}

function handleBeforeInput(event: InputEvent) {
  const editableBox = event.currentTarget as HTMLHeadingElement;

  switch (event.inputType) {
    case "insertParagraph":
      editableBox.blur();
      break;
    default:
      return;
  }

  event.preventDefault();
}

export default ContentEditable;
