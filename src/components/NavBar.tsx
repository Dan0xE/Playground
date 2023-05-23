import Button from "./shared/Button";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between px-8 pt-4 border-b bg-vercel-black text-vercel-white border-vercel-gray-400">
      <ul className="flex space-x-4">
        <li>
          <ul className="flex flex-row ml-4 space-x-2">
            <li>
              <Button to="/projects/websites" label="Websites" />
            </li>
            <li>
              <Button to="/projects/apps" label="Apps" />
            </li>
            <li>
              <Button to="/projects/tools" label="Tools" />
            </li>
            <li>
              <Button to="/blog" label="Blog" />
            </li>
            <div>
              <Button to="/settings" label="Settings" />
            </div>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
