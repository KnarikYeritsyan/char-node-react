import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import { registrationRequest } from "../store/actions/users";

function Home(props) {
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    avatar: null,
  });
  const handleChange = useCallback((key) => (ev) => {
    setData({ ...data, [key]: ev.target.value })
  }, [data]);


  const handleFileChange = useCallback((ev) => {
    const [file] = ev.target.files;
    if (!file) {
      return;
    }
    // const fileReader = new FileReader();
    // fileReader.onload = (ev) => {
    //   file._preview = ev.target.result;
    //
    //   setData({ ...data, avatar: file });
    // }
    // fileReader.readAsDataURL(file);
    // if (data.avatar) {
    //   URL.revokeObjectURL(file._preview);
    // }
    file._preview = URL.createObjectURL(file);
    const newData = { ...data, avatar: file };
    setData(newData);
    dispatch(registrationRequest(newData, (ev) => {
      setUploaded(ev.loaded / ev.total * 100);
    }));

    ev.target.value = '';
  }, [data]);
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    // dispatch(registrationRequest(data, (ev) => {
    //   setUploaded(ev.loaded / ev.total * 100);
    // }));
  }, [data])
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={data.firstName}
          onChange={handleChange('firstName')}
          placeholder="first name "
        />
        <br />
        <input
          type="text"
          value={data.lastName}
          onChange={handleChange('lastName')}
          placeholder="last name "
        />
        <br />
        <input
          type="text"
          value={data.email}
          onChange={handleChange('email')}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={data.password}
          onChange={handleChange('password')}
          placeholder="Password"
        />
        <br />
        <div className="uploadProcess" style={{ width: uploaded + '%' }} />
        {data.avatar ? (
          <img src={data.avatar._preview} width={256} alt="" />
        ) : null}
        <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
        <br />
        <button>
          Register
        </button>
      </form>
    </div>
  );
}

export default Home;
