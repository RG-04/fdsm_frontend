export default ({ rating, name = "rating", setRating = (i) => true }) => {
  // generate stars based on rating using font awesome
  let stars = [];
  let star;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star = <i key={i} className="fa-solid fa-star text-yellow-400"></i>;
    } else {
      star = <i key={i} className="fa-regular fa-star"></i>;
    }

    stars.push(
      <span className="radio-input mr-2">
        <input
          type="radio"
          id={name + "-rating" + i}
          name={name}
          value={i}
          onChange={(e) => setRating(i)}
          className="opacity-0 fixed w-0"
        />
        <label htmlFor={name + "-rating" + i}>{star}</label>
      </span>
    );
  }

  return <span className="ratings inline-block">{stars}</span>;
};
