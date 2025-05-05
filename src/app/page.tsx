import process from 'process';
import { LoginForm } from '@/components/login-form';

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
    pageSize?: string;
    locale?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const pageSize: number = Number(searchParams?.pageSize) || 4;
  const page = Number(searchParams?.page) || 1;
  const locale = searchParams?.locale || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  console.log(locale);

  // const responsePost = await postData(
  //   `api/posts/search?pagination[page]=${page}&&pagination[pageSize]=${pageSize}&&populate=thumbnail&&populate=categories&&populate=posts&&locale=${locale}`,
  //   {},
  // );
  // const data: ResponsePostDTO[] = responsePost.data;

  return (
    <>
      <div className="relative min-h-svh flex items-center justify-center bg-cover bg-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/images/IDC1.jpg')" }}
        />


        <div className="relative z-10  bg-transparent">
          <LoginForm />
        </div>

      </div>
    </>
  );
}
