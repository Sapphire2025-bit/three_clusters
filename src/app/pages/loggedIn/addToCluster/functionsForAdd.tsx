import React from "react";

export const handleSubmit = (e: React.FormEvent, type: string) => {
  e.preventDefault();
  console.log(`Submitted: ${type}`);
};

export const carRender = () => (
  <div>
    <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "car")}>
      <label>
        Company:
        <input type="text" name="company" />
      </label>
      <label>
        Color:
        <input type="string" name="color" />
      </label>
      <label>
        Year:
        <input type="number" name="year" />
      </label>
      <label>
        Price:
        <input type="number" name="price" />
      </label>
      <button type="submit">Add Car</button>
    </form>
  </div>
);

export const bookRender = () => (
  <div>
    <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "book")}>
      <label>
        Title:
        <input type="text" name="title" />
      </label>
      <label>
        Author:
        <input type="string" name="author" />
      </label>
      <label>
        Price:
        <input type="number" name="price" />
      </label>
      <button type="submit">Add Book</button>
    </form>
  </div>
);

export const animalRender = () => (
  <div>
    <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "animal")}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Type:
        <input type="string" name="type" />
      </label>
      <label>
        Age:
        <input type="number" name="age" />
      </label>
      <button type="submit">Add Animal</button>
    </form>
  </div>
);
