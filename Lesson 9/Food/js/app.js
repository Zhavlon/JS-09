import tabs from './modules/tabs'
import modal, {openModal} from './modules/modal'
import clock from './modules/clock'
import cards from './modules/cards'
import form from './modules/form'
import slider from './modules/slider'
import calc from './modules/calc'

const timeoutId = setTimeout(() => openModal('.modal', timeoutId), 100000)

tabs()
modal('.modal', '[data-modal]')
clock('2022-04-10', '.timer')
cards()
form('.modal')
slider()
calc()