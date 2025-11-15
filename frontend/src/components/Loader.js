// src/components/Loader.js
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div className="text-center my-4">
    <Spinner animation="border" role="status" />
  </div>
);

export default Loader;
