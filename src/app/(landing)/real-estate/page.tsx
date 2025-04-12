"use client";

import HeroSection from "@/components/landing/HeroSection";
import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography, Image as AntdImage } from "antd";
import Image from "next/image";

const ArrowIcon = () => (
  <Image
    src="/images/icons/45deg_arrow.svg"
    alt="Arrow Icon"
    width={24}
    height={24}
  />
);

const listings = [
  {
    title: "Maple Haven Apartments",
    location: "Toronto, ON",
    price: "$1,800/month",
    bedrooms: "1 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "The Aurora Lofts",
    location: "Calgary, AB",
    price: "$1,400/month",
    bedrooms: "1 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "Pacific Breeze Residences",
    location: "Vancouver, BC",
    price: "$2,000/month",
    bedrooms: "1 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "Prairie Sunrise Apartments",
    location: "Winnipeg, MB",
    price: "$1,100/month",
    bedrooms: "2 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "Northern Lights Flats",
    location: "Edmonton, AB",
    price: "$1,250/month",
    bedrooms: "1 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "The St. Lawrence Suites",
    location: "Montreal, QC",
    price: "$1,300/month",
    bedrooms: "Studio",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "Riverfront Heights",
    location: "Ottawa, ON",
    price: "$1,600/month",
    bedrooms: "2 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
  {
    title: "Wellesley St East Parliament",
    location: "Toronto, ON",
    price: "$1,800/month",
    bedrooms: "1 bedroom",
    images: [
      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
      "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    ],
  },
];

const { Text, Title } = Typography;

export default function RealEstatePage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/landing/real_estate_hero_section.jpg"
        title="Find the Perfect Space Tailored to Your Needs."
        subtitle="Browse homes, apartments, and commercial spaces with ease"
        buttonText="Explore Listings"
        buttonLink="/listings"
      />

      <section className="mt-10 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm md:text-base text-gray-600 mb-5">
            Featured Listings
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            Find Your Dream Home
          </h3>
        </div>
        <Row gutter={[16, 16]} justify="center">
          {listings.map((listing, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable={false}
                cover={
                  <AntdImage.PreviewGroup>
                    {listing.images.map((imageSrc, idx) => (
                      <AntdImage
                        key={idx}
                        src={imageSrc}
                        alt={`${listing.title} image ${idx + 1}`}
                        style={{
                          borderRadius: idx === 0 ? "8px 8px 0 0" : 0,
                          objectFit: "cover",
                          width: "100%",
                          height: 180,
                          display: idx === 0 ? "block" : "none",
                        }}
                      />
                    ))}
                  </AntdImage.PreviewGroup>
                }
                className="shadow-md rounded-xl"
              >
                <Title level={5}>{listing.title}</Title>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Text>
                    <EnvironmentOutlined style={{ marginRight: "8px" }} />
                    {listing.location}
                  </Text>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <Text>
                    <HomeOutlined style={{ marginRight: "8px" }} />
                    {listing.bedrooms}
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-lg font-semibold">{listing.price}</Text>
                  <Button
                    shape="circle"
                    icon={<ArrowIcon />}
                    size="large"
                    color="danger"
                    variant="filled"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}
