import { EventInterface } from '@splidejs/splide'

export default function fadeScaleTransition( Splide, Components ) {
  const { bind } = EventInterface( Splide );
  const { Move } = Components;
  const { list } = Components.Elements;

  let endCallback;

  // Fade and scale
  function applyFadeScale (index) {
    Components.Slides.get().forEach(item => {
      item.slide.style.transition = 'opacity 800ms cubic-bezier(.44,.65,.07,1.01), transform 800ms cubic-bezier(.44,.65,.07,1.01)'
      item.slide.style.opacity = '0.2'
      item.slide.style.transform = 'scale(0.9)'
    })
    const nextSlide = Components.Slides.getAt(index)
    nextSlide.slide.style.opacity = '1'
    nextSlide.slide.style.transform = 'scale(1)'
  }

  function mount() {
    // Set animation on the first slide on initialisation
    applyFadeScale(0)

    bind( list, 'transitionend', e => {
      if ( e.target === list && endCallback ) {
        // Removes the transition property
        cancel();

        // Calls the `done` callback
        endCallback();
      }
    } );
  }

  function start( index, done ) {
    // Converts the index to the position
    const destination = Move.toPosition( index, true );

    // Applies the CSS transition
    list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

    applyFadeScale(index)

    // Moves the carousel to the destination.
    Move.translate( destination );

    // Keeps the callback to invoke later.
    endCallback = done;
  }

  function cancel() {
    list.style.transition = '';
  }

  return {
    mount,
    start,
    cancel,
  };
}