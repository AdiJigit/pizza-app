import Image from "next/image";

export default function Footer() {
  return <div className="ft-con flex flex-col md:flex-row mt-[100px] md:mt-auto">
    <div className="md:flex-1 relative flex">
      <Image src='/img/featured3.png' fill alt='' className="object-cover object-left" />
    </div>
    <div className="md:flex-1 relative px-4 flex flex-col md:flex-row mt-52 md:mt-auto">
      <div className="flex-1 px-[20px]">
        <h2 className="text-[18px] font-bold mb-10 md:mb-auto">OH YES, WE DID. THE ADI PIZZA, WELL BAKED SLICE OF PIZZA.</h2>
      </div>
      <div>
        <h1 className="text-[18px] font-bold ">FIND OUR RESTAURANTS</h1>
        &nbsp;
        <p className="">7262 R. Avenue #304 <br /> NewYork, 75622 <br/> (301) 293-1240</p>
        &nbsp;
        <p className="">2362 R. Caroll #204 <br /> Los Angeles, 53222 <br/> (109) 234-8263</p>
        &nbsp;
        <p className="">1354 R. Erwin #104 <br /> Boston, 18422 <br/> (604) 175-0645</p>
        &nbsp;
        <p className="">9652 R. Johns #404 <br /> Las Vegas, 74622 <br/> (653) 745-2347</p>
      </div>
      <div className="md:flex-1 md:px-[20px] my-10 md:my-0">
        <h1 className="text-[18px] font-bold ">WORKING HOURS</h1>
        &nbsp;
        <p className="">MONDAY UNTIL FRIDAY <br/> 9:00 - 22:00</p>
        &nbsp;
        <p className="">SATURDAY - SUNDAY<br/> 12:00 - 24:00</p>
      </div>
    </div>
  </div>;
}
