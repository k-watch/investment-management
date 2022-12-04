import Skeleton from '@mui/material/Skeleton';

const CommonSkeleton = (limit: number) => {
  const rendering = () => {
    const result = [];

    for (let i = 0; i < limit; i++) {
      result.push(
        <Skeleton
          key={i}
          sx={{ marginBottom: 1 }}
          variant="rectangular"
          animation="wave"
          width="100%"
          height={50}
        />
      );
    }
    return result;
  };

  return <>{rendering()}</>;
};

export default CommonSkeleton;
