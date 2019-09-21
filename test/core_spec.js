import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
	describe('set entries', () => {

		it('adds entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 days later');
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 days later')
			}));

		});

		it('converts to immutable', () => {
		  const state = Map();
		  const entries = ['Trainspotting', '28 Days Later'];
		  const nextState = setEntries(state, entries);
		  expect(nextState).to.equal(Map({
		    entries: List.of('Trainspotting', '28 Days Later')
		  }));
		});

		it('takes the next two entires under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 days later', 'sunshine')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later')
				}),
				entries: List.of('sunshine')
			}));


		});

		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later')
				}),
				entires: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting' : 1
					})
				}),
				entires: List()
			}));
		});

		it('adds to existing tally for voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 3,
						'28 days later': 2
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 4,
						'28 days later': 2
					})
				}),
				entries: List()
			}));

		});

		// it('puts winner of current vote back to entries', () => {
		// 	const state = Map({
		// 		vote: Map({
		// 			pair: List.of('Trainspotting', '28 days later'),
		// 			tally: Map({
		// 				'Trainspotting': 4,
		// 				'28 days later': 2
		// 			}),
		// 		}),
		// 		entries: List.of('Sunshine', 'Millions', '127 Hours')
		// 	});
		// 	const nextState = next(state);

		// 	expect(nextState).to.equal(Map({
		// 		vote: Map({
		// 			pair: List.of('Sunshine', 'Millions')
		// 		}),
		// 		entries: List.of('127 hours', 'Trainspotting')
		// 	}));
		// });

		// it('puts both from tied vote back to entries', () => {
		// 	const state = Map({
		// 		vote: Map({
		// 			pair: List.of('Trainspotting', '28 days later'),
		// 			tally: Map({
		// 				'Trainspotting': 3,
		// 				'28 days later': 3
		// 			}),
		// 		}),
		// 		entries: List.of('Sunshine', 'Millions', '127 Hours')
		// 	});
		// 	const nextState = next(state);

		// 	expect(nextState).to.equal(Map({
		// 		vote: Map({
		// 			pair: List.of('Sunshine', 'Millions')
		// 		}),
		// 		entries: List.of('127 hours', 'Trainspotting', '28 days later')
		// 	}));

		// });

		it('puts winner of current vote back to entries', () => {
    const state = Map({
      vote: Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours', 'Trainspotting')
    }));
  });

  it('puts both from tied vote back to entries', () => {
    const state = Map({
      vote: Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 3
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
    }));
  });

	});

});


























