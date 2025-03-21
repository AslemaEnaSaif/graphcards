import { useDispatch, useSelector } from "react-redux";
import "@szhsin/react-menu/dist/core.css";

import styles from "./GraphDecksPage.module.scss";
import { useCallback, useEffect, useState } from "react";
import { setActiveDeck, setDecksInfo } from "../store/slices/deckSlice";
import "../constituants/DeckMenu.scss";

import { useNavigate } from "react-router-dom";
import { selectDecksInfo } from "../store/selectors/deckSelector";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import {
  deleteDeckRequest,
  getDeckRequest,
  getDecksInfoRequest,
} from "../services/api/decksApi";
import AddDeck from "../constituants/AddDeck";
import EditDeckForm from "../constituants/EditDeckForm";

export default function GraphDecksPage() {
  console.log("GraphDecksPage rendering");
  const [editingDeck, setEditingDeck] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decksInfo = useSelector(selectDecksInfo);
  // TODO: special effect to selected deck
  // const activeDeck = useSelector(selectActiveDeck);

  useEffect(() => {
    const fetchDecksInfo = async () => {
      const fetchedDecksInfo = await getDecksInfoRequest();
      dispatch(setDecksInfo(fetchedDecksInfo));
    };

    fetchDecksInfo();
  }, [dispatch]);

  const handleDeckClick = (deckId: string) => {
    const fetchDeck = async () => {
      const selectedDeck = await getDeckRequest(deckId);
      dispatch(setActiveDeck(selectedDeck));
      navigate("/playground");
    };
    if (!editingDeck) {
      fetchDeck();
    }
  };

  const handleDeckEditIConClick = useCallback((deckId: string) => {
    setEditingDeck(deckId);
  }, []);

  const handleDeleteDeck = useCallback(
    async (deckId: string) => {
      const isdeleted = await deleteDeckRequest(deckId);
      // Refresh store state before DB
      if (isdeleted) {
        if (decksInfo == null) {
          throw new Error("decksinfo isnull ");
        }
        const newDecksInfo = decksInfo.filter(
          (deckInfo) => deckInfo._id !== deckId
        );

        dispatch(setDecksInfo(newDecksInfo));
      }
    },
    [decksInfo, dispatch]
  );

  return (
    <div className={styles.decksPageContainer}>
      <h1>My GraphDecks</h1>

      <div className={styles.decksList}>
        <AddDeck />

        {decksInfo?.map((deckInfo) => (
          <div key={deckInfo._id} className={`${styles.deckSpace}`}>
            <div
              className={`${styles.deckRepresentation} ${styles.deckInfoContainer}`}
              onClick={() => handleDeckClick(deckInfo._id)}
            >
              <div className={`${styles.scrollableDeckContent}`}>
                {editingDeck !== null && editingDeck === deckInfo._id ? (
                  <EditDeckForm
                    deckInfo={deckInfo}
                    setEditDeckMode={setEditingDeck}
                  />
                ) : (
                  <>
                    <div className={`${styles.deckNameContainer}`}>
                      {deckInfo.name}
                    </div>
                    <div className={`${styles.deckDecriptionContainer}`}>
                      {deckInfo.description}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={`${styles.deckEllipsisContainer}`}>
              <Menu menuButton={<EllipsisVertical />}>
                <MenuItem onClick={() => handleDeckEditIConClick(deckInfo._id)}>
                  <div className={`${styles.itemDiv}`}>
                    <Pencil className={`${styles.deckEditIcon}`} size={14} />
                    <div>Edit</div>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteDeck(deckInfo._id)}>
                  <div className={`${styles.itemDiv}`}>
                    <Trash className={`${styles.deckTrashIcon}`} size={14} />
                    <div>Delete</div>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
