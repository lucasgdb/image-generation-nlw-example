import { useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

import CopyButton from '../UI/atoms/CopyButton';
import Input from '../UI/atoms/Input';
import Radio from '../UI/atoms/Radio';
import Card from '../UI/molecules/Card';

export default function URL() {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cardType, setCardType] = useState<'explorer' | 'ignite'>('explorer');

  const [debouncedImageUrl] = useDebounce(imageUrl, 500);
  const [debouncedUsername] = useDebounce(username, 500);
  const [debouncedLastname] = useDebounce(lastname, 500);

  const handleChangeImageUrl = (value: string) => setImageUrl(value);

  const handleChangeUsername = useDebouncedCallback((value: string) => setUsername(value), 500);

  const handleChangeLastname = useDebouncedCallback((value: string) => setLastname(value), 500);

  const handleChangeCardType = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'explorer' && event.target.checked) {
      setCardType('explorer');
      return;
    }

    if (event.target.id === 'ignite' && event.target.checked) {
      setCardType('ignite');
    }
  };

  const getCardUrl = () => {
    if (!debouncedImageUrl && !debouncedUsername && !debouncedLastname && cardType === 'explorer') {
      return '/bg-explorer.png';
    }

    if (!debouncedImageUrl && !debouncedUsername && !debouncedLastname && cardType === 'ignite') {
      return '/bg-ignite.png';
    }

    const cardUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}&username=${username}&lastname=${lastname}&cardType=${cardType}`;
    return cardUrl;
  };

  const cardUrl = getCardUrl();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Input
                type="url"
                placeholder="URL da imagem"
                defaultValue={imageUrl}
                onChange={(event) => handleChangeImageUrl(event.target.value)}
              />

              <Input
                type="text"
                placeholder="Nome"
                defaultValue={username}
                onChange={(event) => handleChangeUsername(event.target.value)}
              />

              <Input
                type="text"
                placeholder="Sobrenome"
                defaultValue={lastname}
                onChange={(event) => handleChangeLastname(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <Radio
                name="cardType"
                id="explorer"
                checked={cardType === 'explorer'}
                onChange={handleChangeCardType}
                label="Explorer"
              />

              <Radio
                name="cardType"
                id="ignite"
                checked={cardType === 'ignite'}
                onChange={handleChangeCardType}
                label="Ignite"
              />
            </div>
          </div>

          <Card cardUrl={cardUrl} />
        </div>
      </div>

      <hr className="divide-y" />

      <div className="flex">
        <CopyButton text={cardUrl} disabled={!imageUrl} />
      </div>
    </div>
  );
}
