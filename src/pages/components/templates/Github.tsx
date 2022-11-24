import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import CopyButton from '../UI/atoms/CopyButton';
import Input from '../UI/atoms/Input';
import Radio from '../UI/atoms/Radio';
import Card from '../UI/molecules/Card';

export default function Github() {
  const [username, setUsername] = useState('');
  const [cardType, setCardType] = useState<'explorer' | 'ignite'>('explorer');

  const [debouncedUsername] = useDebounce(username, 500);

  const handleChangeUsername = (value: string) => setUsername(value);

  const handleChangeCardType = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'explorer' && event.target.checked) {
      setCardType('explorer');
      return;
    }

    if (event.target.id === 'ignite' && event.target.checked) {
      setCardType('ignite');
    }
  };

  const cardUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?githubUsername=${debouncedUsername}&cardType=${cardType}`;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Usuário Github"
              defaultValue={username}
              onChange={(event) => handleChangeUsername(event.target.value)}
            />

            <div className="flex flex-col gap-1">
              <p>Card:</p>

              <div className="flex flex-col gap-2">
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
          </div>

          <Card cardUrl={cardUrl} />
        </div>
      </div>

      <hr className="divide-y" />

      <div className="flex">
        <CopyButton text={cardUrl} disabled={!username} />
      </div>
    </div>
  );
}
