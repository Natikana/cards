import React, { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch } from "@/main/hooks"
import { clearParams, packsThunk, setParams } from "@/features/packs/packsSlice"
import { PacksList } from "@/features/packs/packsList/PacksList"
import cl from "./Packs.module.css"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "@/common/utils/debounce/debounse"
import { SearchSlider } from "@/features/packs/slider/SearchSlider"
import { PaginationPacks } from "@/features/packs/paginationPacks/PaginationPacks"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import { ModalPack } from "@/common/basicModal/modalPack/ModalPack"
import question from "@/commonAccess/question.png"

export const Packs = () => {
  const dispatch = useAppDispatch()
  const my_id = useSelector(profileSelector)._id
  const [search, setSearch] = useSearchParams()
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 1000)

  useEffect(() => {
    const urlParams = Object.fromEntries(search)
    dispatch(packsThunk.getsPack(urlParams))
    dispatch(setParams(urlParams))
  }, [search])

  useEffect(() => {
    const searchParams = Object.fromEntries(search)
    const packSearch = search.get("packName")
    if (packSearch) setSearch({ ...searchParams, packName: value })
  }, [debouncedValue])

  const onHandlerCreateUserPack = (pack: {
    name: string
    private: boolean
    deckCover: string
  }) => {
    dispatch(
      packsThunk.createPack({
        cardsPack: {
          name: pack.name,
          private: pack.private,
          deckCover: question,
        },
      }),
    )
  }
  const showAllPacks = () => {
    const searchParams = Object.fromEntries(search)
    // delete s.user_id
    const { user_id, ...new_s } = searchParams
    setSearch({ ...new_s })
  }

  const showMyPacks = () => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, user_id: my_id })
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, packName: event.currentTarget.value })
    setValue(event.currentTarget.value)
  }
  const onHandlerClearFilter = () => {
    const searchParams = Object.fromEntries(search)
    const { user_id, packName, min, max, page, ...new_s } = searchParams
    setSearch({ ...new_s })
    dispatch(clearParams())
    setValue("")
  }
  return (
    <div className={cl.packs}>
      <div className={cl.blockTitle}>
        <h3 style={{ color: "green" }}>Packs list</h3>
        <ModalPack
          from={"Packs"}
          onHandlerRequest={onHandlerCreateUserPack}
          nameModalBtn={"Add New Pack"}
        />
      </div>
      <div className={cl.packsSearchingSection}>
        <div className={cl.blockSetting}>
          <input
            value={value}
            onChange={handleChange}
            placeholder={"search the packs"}
            type={"search"}
            className={cl.searchingInput}
          />
          <div className={cl.blockSwitchCards}>
            <div className={cl.blockSwitchMyCards}>
              <span style={{ fontSize: "14px", color: "white" }}>
                Show packs cards
              </span>
              <button onClick={showMyPacks} className={cl.btnCards}>
                My cards
              </button>
            </div>
            <button
              onClick={showAllPacks}
              className={`${cl.btnCards} ${cl.btnChangeCards}`}
            >
              All cards
            </button>
          </div>
          <div className={cl.blockInputsRange}>
            <span style={{ fontSize: "14px", color: "white" }}>
              Number of cards
            </span>
            <div className={cl.blockInputs}>
              <SearchSlider />
            </div>
          </div>
          <button onClick={onHandlerClearFilter} className={cl.btnFilter}>
            Clear Filter
          </button>
        </div>
      </div>
      <PacksList />
      <PaginationPacks />
    </div>
  )
}
