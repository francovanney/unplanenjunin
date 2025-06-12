interface ButtonProps {
  text: string;
  url: string;
}

const Button = ({ text, url }: ButtonProps) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button
        disabled={!url}
        className={`cursor-pointer px-6 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md hover:bg-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:bg-red-950
          ${
            !url
              ? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
              : ""
          }
        `}
      >
        {text}
      </button>
    </a>
  );
};

export default Button;
