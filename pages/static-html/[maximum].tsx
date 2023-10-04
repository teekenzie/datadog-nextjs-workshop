import { LargestPrimePage } from "@/lib/LargestPrimePage";
import { DEVELOPER_NAME } from "@/lib/developer-name";
import { getLargestPrime } from "@/lib/get-largest-prime";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";

const MAX_STATIC_ROUTE = 9000000;

export const getStaticPaths = (() => {
  const staticRoutes: { params: { maximum: string } }[] = [];

  // Add powers of 10 up to max
  for (let i = 10; i <= MAX_STATIC_ROUTE; i *= 10) {
    staticRoutes.push({ params: { maximum: i.toString() } });
  }
  return {
    paths: staticRoutes,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = () => {
  return { props: {} };
};

const SSGPrimePage = () => {
  const router = useRouter();

  let maxString = router.query.maximum;

  const max = Number.parseInt(maxString as string);

  const largestPrime = useMemo(() => {
    return getLargestPrime(max);
  }, [max]);

  console.log(
    JSON.stringify({ largestPrime, strategy: "ssg", developer: DEVELOPER_NAME })
  );

  return (
    <LargestPrimePage
      maximum={max}
      largestPrime={largestPrime}
      contentStrategy="ssg"
    />
  );
};

export default SSGPrimePage;
