// App.jsx
// use functions, primitive and complex types as data in components.
// use arrow functions

/**
   * Get the grand parents of daughter Hannah.
   */
const getGrandParents = () => (
  // It would be more generic to save the parents of each parent separately.
  // We may search better solutions later.
  {
    parentsOfMother: {
      father: "Manfred",
      mother: "Ursula"
    },
    parentsOfFather: {
      father: "Hans",
      mother: "Ulla"
    }
  }
)

const hannahsInterests = ["playing", "reading", "drawing"];

const App = () => {
  const daughter_name = "Hannah";
  const daughter_age = 7;

  const family = {
    father: "Peter",
    mother: "Stefanie",
    daughter: "Hannah"
  }

  const fathersParents = getGrandParents().parentsOfFather;

  return (
    <div>
      <h1>Hello {daughter_name}!</h1>
      <p>You are {daughter_age} years old. Nice!</p>

      <h2>Your parents</h2>
      <p>{family.mother} and {family.father} like you and are very proud of you.</p>

      <h2>Your grand parents</h2>
      <p>The grand parents you know are {getGrandParents().parentsOfMother.father},&nbsp;
        {getGrandParents().parentsOfMother.mother} and {fathersParents.mother}.
        Unfortunately, you never got the chance to meet Hans.</p>

      <h1>Page purpose</h1>
      <p>Show use of simple constants in component.</p>
      <p>Use of an object with data.</p>
      <p>Use data from a separate function.</p>
    </div>
  )
}

export default App
