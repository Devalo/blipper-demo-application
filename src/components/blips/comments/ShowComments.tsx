import React from 'react';

interface Props {
  comments: any,
}

const ShowComments = (props: Props) => {
  const { comments } = props;

  if (comments === undefined) {
    return null;
  }

  const iterableComments: Array <any> = [];
  for (const key of Object.keys(comments)) {
    const value = comments[key];
    iterableComments.push({ key, value });
  }
  return (
    <div className="comments">
      {iterableComments.map((comment) => (
        <>
          <div>
            {comment.value.displayName}
            <br />
            {comment.value.comment}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default ShowComments;
