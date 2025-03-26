
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top right gradient */}
      <div 
        className="absolute -top-80 -right-80 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 bg-blue-500 animate-pulse-soft"
        style={{ animationDelay: "0s" }}
      ></div>
      
      {/* Bottom left gradient */}
      <div 
        className="absolute -bottom-80 -left-80 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 bg-indigo-500 animate-pulse-soft"
        style={{ animationDelay: "2s" }}
      ></div>
      
      {/* Center small accent */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl opacity-10 bg-violet-500 animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      ></div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
      ></div>
    </div>
  );
};

export default AnimatedGradient;
