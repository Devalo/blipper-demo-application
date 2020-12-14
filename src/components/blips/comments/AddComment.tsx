import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createComment } from '../../../lib/reducers/blipReducer';

interface Props {
  blipId: string;
  user: {
    id: string;
    photoUrl: string;
    email: string;
    displayName: string;
    blips: Array<string>;
  };
}

const AddComment = (props: Props) => {
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createComment(props.blipId, {
      comment: data.comment,
      uid: props.user.id,
      displayName: props.user.displayName,
    }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-10">
          <textarea
            className="form-control"
            name="comment"
            ref={register({ required: true })}
          />
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className="btn btn-secondary btn-sm"
          >
            Kommenter
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
