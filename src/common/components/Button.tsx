interface ButtonProps {
  text: string;
  url?: string;
}

const Button = ({ text, url }: ButtonProps) => {
  if (!url) {
    return <div className="h-10" />;
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className="cursor-pointer px-6 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md hover:bg-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:bg-red-950">
        {text}
      </button>
    </a>
  );
};

export default Button;
