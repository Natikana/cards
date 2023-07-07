import React, { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { clearParams, packsThunk, setParams } from "@/features/packs/packsSlice"
import { PacksList } from "@/features/packs/packsList/PacksList"
import cl from "./Packs.module.css"
import { useSearchParams } from "react-router-dom"
import { Statuses } from "@/features/app/app.slice"
import { useDebounce } from "@/common/utils/debounce/debounse"
import { SearchSlider } from "@/features/packs/slider/SearchSlider"
import { GetPackType } from "@/features/packs/packsApi/packsApi"
import { PaginationPacks } from "@/features/packs/paginationPacks/PaginationPacks"
import { useSelector } from "react-redux"
import { loadingSelector } from "@/features/app/app.selector"
import { paramsSelector } from "@/features/packs/packs.selector"
import { profileSelector } from "@/features/auth/auth.selector"

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(loadingSelector)
  const params = useSelector(paramsSelector)
  const my_id = useSelector(profileSelector)._id

  const [search, setSearch] = useSearchParams()
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    if (search) {
      dispatch(setParams({ ...Object.fromEntries(search) }))
      const packName = ({ ...Object.fromEntries(search) } as GetPackType)
        ?.packName
      if (packName) {
        setValue(packName)
      }
    }
  }, [])

  useEffect(() => {
    dispatch(packsThunk.getsPack({ page: params?.page }))
  }, [
    params?.user_id,
    params?.packName,
    params?.min,
    params?.max,
    params?.page,
    params?.pageCount,
  ])

  useEffect(() => {
    dispatch(setParams({ packName: value }))
  }, [debouncedValue])

  const onHandlerCreateUser = () => {
    dispatch(
      packsThunk.createPack({
        cardsPack: { name: "Sonia", private: false },
      }),
    )
  }
  const showAllPacks = () => {
    const s = Object.fromEntries(search)
    // delete s.user_id
    const { user_id, ...new_s } = s
    setSearch({ ...new_s })
    dispatch(setParams({ user_id: "" }))
  }

  const showMyPacks = () => {
    const s = Object.fromEntries(search)
    setSearch({ ...s, user_id: my_id })
    dispatch(setParams({ user_id: my_id }))
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const s = Object.fromEntries(search)
    setSearch({ ...s, packName: event.currentTarget.value })
    setValue(event.currentTarget.value)
  }
  const onHandlerClearFilter = () => {
    const s = Object.fromEntries(search)
    const { user_id, packName, min, max, page, ...new_s } = s
    setSearch({ ...new_s })
    dispatch(clearParams())
    setValue("")
    console.log(params)
  }
  return (
    <div className={cl.packs}>
      <div className={cl.blockTitle}>
        <h3 style={{ color: "green" }}>Packs list</h3>
        <button
          disabled={isLoading === Statuses.loading}
          onClick={onHandlerCreateUser}
          className={`${cl.btnCards} ${cl.btnChangeCards}`}
        >
          Add New Pack
        </button>
      </div>
      <div className={cl.packsSearchingSection}>
        <div className={cl.blockSetting}>
          <input
            value={value}
            onChange={handleChange}
            placeholder={"Input search"}
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
