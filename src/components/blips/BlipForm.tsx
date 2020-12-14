import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addBlip } from '../../lib/reducers/blipReducer';

interface Props {

}

const BlipForm = (props: Props) => {
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, reset,
  } = useForm();

  const onSubmit = (data: { text: string }) => {
    dispatch(addBlip(data));
    reset();
  };

  return (
    <div className="blipForm">
      <div className="headline">
        <h2>Skriv blip</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="form-control"
          rows={5}
          name="text"
          ref={register({ required: true })}
        />
        {errors.text && 'Du må fylle inn en blipp.'}
        <button type="submit" className="btn btn-primary m-1 float-end">Post Blipp </button>
      </form>
    </div>
  );
};

export default BlipForm;
