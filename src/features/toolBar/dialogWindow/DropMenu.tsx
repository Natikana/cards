import * as React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import cl from "./DropMenu.module.css"
import personIcon from "@/commonAccess/personIcon.png"
import logout from "@/commonAccess/log-out.png"
import card from "@/commonAccess/card.png"
import { Link } from "react-router-dom"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "@/features/auth/auth.slice"

export const DropMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const userAva = useSelector(profileSelector).avatar
  const userName = useSelector(profileSelector).name
  const userEmail = useSelector(profileSelector).email
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, padding: "0", margin: "0" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img className={cl.avaImg} src={userAva} alt={"avatar"} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "#171717",
            border: "1px solid #333",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {},
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#171717",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              border: "1px solid #333",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={cl.menu}>
          <div className={cl.userInfo}>
            <img className={cl.avaImg} src={userAva} alt={"ava"} />
            <div className={cl.userDates}>
              <span className={cl.name}>{userName}</span>
              <span className={cl.email}>{userEmail}</span>
            </div>
          </div>
          <hr className={cl.divider}></hr>
          <MenuItem onClick={handleClose} sx={{ padding: "0" }}>
            <Link className={cl.link} to={"/packs"}>
              <img className={cl.iconImg} src={card} alt={"card"} />
              <span className={`${cl.email} ${cl.text}`}>Packs</span>
            </Link>
          </MenuItem>
          <hr className={cl.divider}></hr>
          <MenuItem onClick={handleClose} sx={{ padding: "0" }}>
            <Link className={cl.link} to={"/profile"}>
              <img className={cl.iconImg} src={personIcon} alt={"personIcon"} />
              <span className={`${cl.email} ${cl.text}`}>My Profile</span>
            </Link>
          </MenuItem>
          <hr className={cl.divider}></hr>
          <MenuItem onClick={handleClose} sx={{ padding: "0" }}>
            <button
              className={cl.logoutBtn}
              onClick={() => dispatch(authThunk.logout({}))}
            >
              <img className={cl.iconImg} src={logout} alt={"logout"} />
              <span className={`${cl.email} ${cl.text}`}>Sing Out</span>
            </button>
          </MenuItem>
        </div>
      </Menu>
    </>
  )
}
