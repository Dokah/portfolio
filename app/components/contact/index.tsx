import { isMobile } from "~/utility/utils";

export const Contact = () => {
  return (
    <div>
      {isMobile() && <h1>Contact</h1>}
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmIybDl0OGF0ZHZ6NmYwZ25lcXp2Z2h6bnpxZ3IyeW50ZHBlMnAxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vR1dPIYzQmkRzLZk2w/giphy.gif"
        alt="under-construction"
      ></img>
    </div>
  );
};
