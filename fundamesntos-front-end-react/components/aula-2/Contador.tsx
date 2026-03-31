"use client";

import { useEffect, useState } from "react";

import { Button } from "./Button";

export const Contador = () => {
  const [contador, setContador] = useState(0);
  const [coisa, setCoisa] = useState("");

  useEffect(() => {
    console.log("contador atualizado!");
  }, [contador]);

  useEffect(() => {
    console.log("coisa atualizado!");
  }, [coisa]);

  useEffect(() => {
    console.log("contador ou coisa atualizado!");
  }, [contador, coisa]);

  return (
    <div className="grid gap-y-4">
      <h2 className="text-2xl">Contador</h2>
      <p>Número atual: {contador}</p>
      <div className="flex gap-x-2">
        <Button
          onClick={() => {
            setContador((c) => c - 3);
          }}
        >
          -3
        </Button>
        <Button
          onClick={() => {
            setContador((c) => c - 1);
          }}
        >
          -1
        </Button>
        <Button
          onClick={() => {
            setContador((c) => c + 1);
          }}
        >
          +1
        </Button>
        <Button
          onClick={() => {
            setContador((c) => c + 3);
          }}
        >
          +3
        </Button>
        <Button
          onClick={() => {
            setContador(0);
          }}
        >
          Reset
        </Button>
      </div>
      <input
        type="text"
        value={coisa}
        onChange={(e) => setCoisa(e.target.value)}
        placeholder="Digite algo"
        className="border border-gray-300 p-2 rounded"
      />
    </div>
  );
};
