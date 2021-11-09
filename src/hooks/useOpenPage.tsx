import { useRouter } from 'next/router';

const useOpenPage = () => {
  const router = useRouter();

  const openPage = (url: string, e: React.MouseEvent<HTMLElement>) => {
    if (e.ctrlKey || e.metaKey) {
      return window.open(url, '_blank');
    }
    router.push(url);
  };

  return openPage;
};

export default useOpenPage;
