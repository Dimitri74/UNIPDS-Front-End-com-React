const hobbies = ["Assistir Filmes", "Familia", "Esportes", "Viajar"];

export const Hobbies = () => {
  const [hobbyPreferido, ...outrosHobbies] = hobbies;

  const novosHobbies = ["Festas", "Baladas"];

  const meusHobbies = [...outrosHobbies, ...novosHobbies];

  return (
    <div>
      <p>Estes são os meus hobbies:</p>
      <ul className="list-disc pl-10">
        <li className="font-bold">{hobbyPreferido}</li>
        {meusHobbies.map((meuHobby, i) => (
          <li key={`hobby-${i}`}>{meuHobby}</li>
        ))}
      </ul>
    </div>
  );
};
