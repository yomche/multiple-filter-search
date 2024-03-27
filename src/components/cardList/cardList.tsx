import { FC } from "react";
import { CharacterType } from "../../types/app.type";
import { Card } from "../../ui/card";
import styles from "./cardList.module.scss";

interface CardList {
  characters: CharacterType[];
}

export const CardList: FC<CardList> = ({ characters }) => {
  return (
    <div className={styles.cards}>
      {characters.map((character: CharacterType) => {
        return (
          <div key={character?.id}>
            <Card
              url={character?.image}
              name={character?.name}
              species={character?.species}
              status={character?.status}
              gender={character?.gender}
            />
          </div>
        );
      })}
    </div>
  );
};
