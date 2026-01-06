import React from "react";
import Container from "@/components/ui/Container";

const CancellationPolicy = () => {
  return (
    <div className="prose-sm mx-auto c-md:prose">
      <section className="pt-24 text-white c-md:pt-28 c-xl:pt-32">
        <Container>
          <div className="rounded-3xl bg-brand-blue p-8 text-center c-md:py-12  c-xl:py-20 ">
            <h1 className="!text-white">CANCELLATION POLICY</h1>
          </div>
        </Container>
      </section>
      <section className="py-8 c-md:py-12 c-xl:py-16">
        <Container>
          <h3>A. After Booking</h3>
          <p>
            If a cancellation is made after booking, there will be a charge of
            10% of the total cost. This fee is applicable regardless of the
            timing of the cancellation.
          </p>
          <h3>B. 30 Days or More Prior to Arrival</h3>
          <p>
            If a cancellation is made 30 days or more before the scheduled
            arrival date, there will be a charge of 25% of the total cost. This
            fee applies to cancellations made well in advance of the arrival
            date.
          </p>
          <h3>C. 30 to 15 Days Prior to Arrival</h3>
          <p>
            If a cancellation is made between 30 to 15 days before the scheduled
            arrival date, there will be a charge of 50% of the total cost. This
            fee applies to cancellations made within a moderately advanced
            notice period.
          </p>
          <h3>D. 15 Days or Less Prior to Arrival</h3>
          <p>
            If a cancellation is made 15 days or less before the scheduled
            arrival date, there will be a charge of 75% of the total cost. This
            fee applies to cancellations made within a short notice period.
          </p>
          <h3>E. 3 to 1 Day Prior to Arrival, Same Day, or No Show</h3>
          <p>
            If a cancellation is made 3 to 1 day prior to the scheduled arrival
            date, on the same day as arrival, or if the customer fails to show
            up for the reservation (No Show), there will be a charge of 100% of
            the total cost. This fee applies to last-minute cancellations or
            failure to arrive without prior notice.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default CancellationPolicy;
