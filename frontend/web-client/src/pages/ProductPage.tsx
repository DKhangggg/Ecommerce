interface Props {
  data?: any;
}

export function ProductDetailPage({ data }: Props) {
  return (
    <>
      <div>{data?.name}</div>
      <div>{data?.description}</div>
      <div>{data?.price}</div>
    </>
  );
}
