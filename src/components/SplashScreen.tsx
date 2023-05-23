function SplashScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen text-center text-white bg-vercel-black">
      <div className="mt-24 mb-auto">
        <h1 className="text-6xl font-bold">Playground</h1>
      </div>
      <div className="mb-10">
        <p className="relative inline-block">
          {message}
          <span className="absolute dot-ellipsis dot-height-106">
            <span className="absolute mr-2 bg-white dot-width-10"></span>
            <span className="absolute mr-2 bg-white dot-width-10"></span>
            <span className="absolute mr-2 bg-white dot-width-10"></span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
