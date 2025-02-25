"use client";

import { motion } from "framer-motion";
import { useGetCollegeBySlug } from "@/features/admin/college/api/use-get-college";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageLoader } from "@/components/page-loader";
import { cn } from "@/lib/utils";
import { CollegeData } from "@/features/admin/college/types";
import { CourseData } from "@/features/admin/course/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const CollegePage = ({ params }: { params: { slug: string } }) => {
  const { data, isPending } = useGetCollegeBySlug(params.slug);
  const college = data?.college;

  if (isPending) return <PageLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          whileHover={{ x: -5 }}
          className="mb-6 inline-block"
        >
          <Link
            href="/admin/college"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Colleges
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="rounded-xl shadow-cartoon p-6 md:p-10 border-2 border-black  relative overflow-hidden"
        >
          <motion.div
            variants={itemVariants}
            className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full blur-xl opacity-40 animate-pulse"
          />
          <motion.div
            variants={itemVariants}
            className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-40 animate-pulse"
          />

          <motion.h1
            variants={itemVariants}
            className="font-cartoon text-4xl md:text-5xl   font-semibold text-center mb-8 animate-bounce-slow"
          >
            {college?.name}
          </motion.h1>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Column */}
            <motion.div variants={containerVariants} className="space-y-6">
              <MotionInfoCard label="Location" value={college?.location} />
              <MotionInfoCard label="Established Year" value={college?.establishedYear} />
              <MotionInfoCard label="Accreditation" value={college?.accreditation} />
              <MotionInfoCard
                label="Website"
                value={<WebsiteLink url={college?.website} />}
              />
              <MotionInfoCard label="Phone" value={college?.phone} />
            </motion.div>

            {/* Right Column */}
            <motion.div variants={containerVariants} className="space-y-6">
              <MotionInfoCard label="Email" value={college?.email} />
              <MotionInfoCard label="Courses" value={<ListItems items={college?.courses?.map((course: CourseData) => course.name)} />} />
              <MotionInfoCard label="Facilities" value={<ListItems items={college?.facilities} />} />
              <MotionInfoCard
                label="Social Links"
                value={<SocialLinks college={college} />}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">About Us</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {college?.description}
            </p>
          </motion.div>

          {college?.images?.length > 0 && (
            <motion.div variants={itemVariants} className="mt-12">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">Campus Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {college.images.map((imgUrl: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full h-64 overflow-hidden rounded-lg border-2 border-pink-300 shadow-cartoon"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Campus Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <MotionStatCard label="Total Students" value={college?.totalStudents} />
            <MotionStatCard label="Total Faculty" value={college?.totalFaculty} />
            <MotionStatCard label="Campus Area" value={`${college?.campusArea} acres`} />
            <MotionStatCard label="Libraries" value={college?.libraries} />
            <MotionStatCard label="Labs" value={college?.labs} />
            <MotionStatCard label="Hostels" value={college?.hostels} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated Components
const MotionInfoCard = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="bg-[#ffed86] p-4 rounded-lg border border-white shadow-sm"
  >
    <h2 className="text-lg font-bold text-blue-600 mb-2">{label}:</h2>
    <div className="text-gray-700">{value}</div>
  </motion.div>
);

const MotionStatCard = ({ label, value }: { label: string; value: string | number }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center bg-white p-4 border-2 border-yellow-300 rounded-lg shadow-cartoon"
  >
    <span className="text-pink-600 font-bold text-2xl">{value}</span>
    <span className="text-gray-600 text-sm">{label}</span>
  </motion.div>
);

// Helper Components
const WebsiteLink = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline break-all hover:text-blue-700 transition-colors"
  >
    {url}
  </a>
);

const ListItems = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    {items?.map((item, idx) => (
      <motion.li
        key={idx}
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        {item}
      </motion.li>
    ))}
  </ul>
);

const SocialLinks = ({ college }: { college: CollegeData }) => (
  <div className="flex gap-3 flex-wrap">
    {college?.facebook && <SocialLink href={college.facebook} platform="Facebook" color="bg-blue-300"  />}
    {college?.twitter && <SocialLink href={college.twitter} platform="Twitter" color="bg-black"/>}
    {college?.instagram && <SocialLink href={college.instagram} platform="Instagram" color="bg-red-300"/>}
    {college?.linkedin && <SocialLink href={college.linkedin} platform="LinkedIn" color="bg-blue-300"/>}
  </div>
);

const SocialLink = ({ href, platform, color }: { href: string; platform: string , color: string}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className={cn("px-4 py-2  rounded-full transition-colors", color)}
  >
    {platform}
  </motion.a>
);

export default CollegePage;