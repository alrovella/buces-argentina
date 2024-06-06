const Footer = () => {
  return (
    <footer className="flex h-14 items-center gap-4 border-b p-4 sm:static sm:h-auto sm:border-0 sm:px-6">
      <h4 className="text-xs">{process.env.APP_NAME} 2024</h4>
    </footer>
  );
};

export default Footer;
