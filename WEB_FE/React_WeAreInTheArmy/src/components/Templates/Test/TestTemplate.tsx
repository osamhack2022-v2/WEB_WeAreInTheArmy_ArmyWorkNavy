import axios from 'axios';
import React, { useState, useCallback, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from 'src/components/UI/Button';
import Input from 'src/components/UI/Input';
import Paper from 'src/components/UI/Paper';
import { RequestTypes } from 'src/type';
import { client } from 'src/util/client';

export default function TestTemplate() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      console.log(e.target.files);
      client
        .post('/api/board/createBoard', {
          type: RequestTypes.DEFAULT,
          title: 'string',
          description: 'string',
          location: 'string',
          admit: true,
          image: e.target.files[0].name,
        })
        .then((res) => console.log(res));
    },
    [],
  );

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onUploadImage}
      />
      <button onClick={onUploadImageButtonClick} />
    </>
  );
}
