import BreadCrumbArea from "@/components/bread-crumb-area";

const Home = async (
    props: {
        searchParams?: Promise<{
            page?: string;
            pageSize?: string;
            locale?: string;
        }>;
    }
) => {

    const searchParams = await props.searchParams;
    const pageSize: number = Number(searchParams?.pageSize) || 4;
    const page = Number(searchParams?.page) || 1;
    const locale = searchParams?.locale || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
    // const data = ;

    return <>
        {/* <BreadCrumbArea /> */}
    </>;
}

export default Home