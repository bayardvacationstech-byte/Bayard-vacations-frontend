import React from "react";
import Container from "@/components/ui/Container";

const RefundPolicy = () => {
  return (
    <div className="prose-sm mx-auto c-md:prose">
      <section className="pt-24 text-white c-md:pt-28 c-xl:pt-32">
        <Container>
          <div className="rounded-3xl bg-brand-blue p-8 text-center c-md:py-12  c-xl:py-20 ">
            <h1 className="!text-white">REFUND POLICY</h1>
          </div>
        </Container>
      </section>
      <section className="py-8 c-md:py-12 c-xl:py-16">
        <Container>
          <p>
            After the cancellation of a reservation, customers can expect to
            receive their refund within 10 to 15 working days. This policy
            ensures that refunds are processed promptly and efficiently. The
            refund will be issued to the original form of payment used for the
            booking.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default RefundPolicy;
