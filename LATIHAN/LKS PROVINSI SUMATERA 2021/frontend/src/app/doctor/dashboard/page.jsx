"use client"
import Footer from "@/components/footer"
import Consultation from "@/components/doctor/consultation"
import NavbarDoctor from "@/components/navbar-doctor"
import FirstVaccination from "@/components/doctor/first-vaccination"
import SecondVaccination from "@/components/doctor/second-vaccination"

export default function DashboardDoctor() {
    return (
        <div className="">
            <NavbarDoctor/>
            <div className="pt-28 px-32 flex flex-col gap-24">
                <Consultation/>
                <FirstVaccination/>
                <SecondVaccination/>
            </div>
            <Footer/>
        </div>
    )
}