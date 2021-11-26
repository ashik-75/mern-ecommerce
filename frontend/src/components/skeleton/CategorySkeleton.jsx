import { Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  return (
    <div style={{ display: "flex" }}>
      <Skeleton height="40px" width="100px" style={{ marginRight: 10 }} />
      <Skeleton height="40px" width="100px" style={{ marginRight: 10 }} />
      <Skeleton height="40px" width="100px" style={{ marginRight: 10 }} />
      <Skeleton height="40px" width="100px" style={{ marginRight: 10 }} />
    </div>
  );
};

export default CategorySkeleton;
