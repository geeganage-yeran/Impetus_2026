import React from 'react';

const CmtAcknowledgment = () => {
  return (
    <section className="py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          The Microsoft CMT service was used for managing the peer-reviewing process 
          for this conference. This service was provided for free by Microsoft and 
          they bore all expenses, including costs for Azure cloud services as well 
          as for software development and support.
        </p>
      </div>
    </section>
  );
};

export default CmtAcknowledgment;