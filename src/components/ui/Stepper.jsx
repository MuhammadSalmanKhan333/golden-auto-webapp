// import React from "react";

// const Stepper = ({ steps, currentStep, onBack }) => {
//   return (
//     <div className="mb-8 relative px-4">
//       <div className="flex justify-between items-center relative z-10">
//         {steps.map((step, index) => {
//           const isCompleted = index + 1 < currentStep;
//           const isCurrent = index + 1 === currentStep;

//           return (
//             <div key={index} className="flex-1 text-center relative">
//               <div
//                 className="relative z-10 w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-semibold"
//                 style={{
//                   backgroundColor: isCompleted
//                     ? "green"
//                     : isCurrent
//                     ? "aqua"
//                     : "#FED700",
//                   borderColor: isCompleted
//                     ? "green"
//                     : isCurrent
//                     ? "aqua"
//                     : "#FED700",
//                   color: isCompleted ? "white" : isCurrent ? "black" : "black",
//                 }}
//               >
//                 {index + 1}
//               </div>
//               <p
//                 className={`text-sm transition-all ${
//                   isCompleted
//                     ? "text-green-600"
//                     : isCurrent
//                     ? "text-[aqua] font-medium"
//                     : "text-[#FED700]"
//                 }`}
//               >
//                 {step}
//               </p>

//               {/* Line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className="absolute top-5 right-0 left-0 transform translate-x-1/2 h-1 transition-all duration-300"
//                   style={{
//                     backgroundColor:
//                       index + 1 < currentStep
//                         ? "green"
//                         : index + 1 === currentStep
//                         ? "aqua"
//                         : "#e5e7eb",
//                     width: "100%",
//                     zIndex: -1,
//                   }}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Back Button */}
//       {currentStep > 1 && (
//         <div className="mt-4">
//           <button
//             onClick={onBack}
//             className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition"
//           >
//             ← Back
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stepper;

import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="mb-8 relative px-4">
      {/* Step Indicators */}
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step, index) => {
          const isCompleted =
            index + 1 < currentStep ||
            (index + 1 === currentStep && currentStep === steps.length);
          const isCurrent = index + 1 === currentStep;

          return (
            <div key={index} className="flex-1 text-center relative">
              {/* Step Circle */}
              <div
                className="relative z-10 w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-semibold"
                style={{
                  backgroundColor: isCompleted ? "green" : "#FED700",
                  borderColor: isCompleted ? "green" : "#FED700",
                  color: isCompleted ? "white" : "black",
                }}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <p
                className={`text-sm transition-all ${
                  isCompleted ? "text-green-600" : "text-[#FED700] font-medium"
                }`}
              >
                {step}
              </p>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-5 right-0 left-0 transform translate-x-1/2 w-full h-1 transition-all duration-300"
                  style={{
                    backgroundColor:
                      index + 1 < currentStep
                        ? "green"
                        : index + 1 === currentStep
                        ? "#FED700"
                        : "#e5e7eb",
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
