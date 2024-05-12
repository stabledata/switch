function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-md m-auto mt-10">
      <div className="flex gap-5 items-center">
        <img
          src="/assets/switch.svg"
          width={80}
          height={80}
          className="w-20"
          alt="Switch logo"
        />
      </div>

      <h1 className="text-4xl">Switch</h1>

      <p className="text-md font-medium">Declarative components</p>

      <h3 className="text-center w-full leading-8 text-md">
        Built on React Form Hook, Shadcn-UI and Tailwind CSS.
      </h3>
    </div>
  );
}

export default Home;
