###!
# fix-scroll
# (c) FL3N
###

class FixScroll
	_state = true
	_fixScrollClassName = 'fix-scroll'
	_fixScrollDataset = 'fixScroll'

	_bindFixScrollEvents = ->
		_findTarget = (e) ->
			target = e.target
			while target != null
				if target.classList && target.classList.contains _fixScrollClassName
					break
					
				target = target.parentNode
			return target

		document.addEventListener 'touchstart', (e) =>
			target = _findTarget e
			if target
				console.log 'touchstart'
				scrollTop = target.scrollTop
				totalScroll = target.scrollHeight
				currentScroll = scrollTop + target.offsetHeight
				height = target.clientHeight

				if height == totalScroll
					target.dataset[_fixScrollDataset] = true

				if scrollTop <= 0
					target.scrollTop = 1
				else if currentScroll >= totalScroll
					target.scrollTop = scrollTop - 1

		document.addEventListener 'touchmove', (e) =>
			if !do @getState
				target = _findTarget e
				if target && _fixScrollDataset in target.dataset
					do e.preventDefault

		document.addEventListener 'touchend', (e) =>
			target = _findTarget e
			if target
				console.log 'touchend'
				target.dataset[_fixScrollDataset] = false

	constructor: ->
		_bindFixScrollEvents.call @

	getWidth: ->
		document.body.style.overflow = 'scroll'
		width = do @getCurrentWidth
		document.body.style.overflow = ''
		return width

	getCurrentWidth: ->
		documentWidth = document.documentElement.clientWidth
		windowWidth = window.innerWidth
		currentWidth = windowWidth - documentWidth
		return currentWidth

	getState: ->
		return _state

	hide: ->
		currentWidth = do @getCurrentWidth
		document.body.style.overflow = 'hidden'
		document.body.style.paddingRight = currentWidth + 'px'
		_state = false

	show: ->
		document.body.style.overflow = ''
		document.body.style.paddingRight = ''
		_state = true

	toggle: ->
		if do @getState
			do @hide
		else
			do @show

if typeof define is 'function' and define.amd
	define([], -> new FixScroll)
else if typeof exports is 'object'
	module.exports = new FixScroll
else
	window.fixScroll = new FixScroll