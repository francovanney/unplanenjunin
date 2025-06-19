import LogoPampa from "../../assets/LogoPampa";

const Footer = () => {
  return (
    <footer className="fixed flex justify-center gap-4 items-center bottom-0 w-full bg-red-300 text-white text-center py-3 shadow-md z-50">
      <p className="text-sm">Desarrollado por</p>
      <a
        href="https://www.pampacode.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LogoPampa width={100} />
      </a>
      <p className="text-sm">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
