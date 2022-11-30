import ImageWithLoader from '../atoms/ImageWithLoader';

interface Props {
  cardUrl: string;
}

export default function Card({ cardUrl }: Props) {
  return (
    <div className="flex justify-center rounded-xl w-[264px] h-[419px] min-w-[264px]">
      <ImageWithLoader src={cardUrl} />
    </div>
  );
}
