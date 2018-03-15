###!
# fix-scroll
# (c) FL3N
###

class FixScroll
	_state = true
	_scrollableClassName = 'fs--scrollable'
	_scrollableDataset = 'fsScrollable'

	_bindFixScrollEvents = ->
		_findTarget = (e) ->
			target = e.target
			while target != null
				if target.classList && target.classList.contains _scrollableClassName
					break
					
				target = target.parentNode
			return target

		document.addEventListener 'touchstart', (e) =>
			target = _findTarget e
			if target
				scrollTop = target.scrollTop
				totalScroll = target.scrollHeight
				height = target.clientHeight
				target.dataset._deltaDataset = e.touches[0].clientY

				if height == totalScroll
					target.dataset._preventScrollableDataset = 'true'

		document.addEventListener 'touchmove', (e) =>
			if !do @getState
				target = _findTarget e
				if target
					if target.dataset._preventScrollableDataset == 'true'
						do e.preventDefault
					else
						scrollTop = target.scrollTop
						totalScroll = target.scrollHeight
						currentScroll = scrollTop + target.offsetHeight
						delta = parseFloat target.dataset._deltaDataset
						currentDelta = e.touches[0].clientY

						if scrollTop <= 0
							if(delta < currentDelta)
								do e.preventDefault
						else if currentScroll >= totalScroll
							if(delta > currentDelta)
								do e.preventDefault

		document.addEventListener 'touchend', (e) =>
			target = _findTarget e
			if target
				target.dataset._preventScrollableDataset = 'false'

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