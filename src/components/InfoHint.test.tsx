import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { InfoHint } from './InfoHint'

const hint = () => screen.queryByText('Because babies drink milk.')

function setup() {
  const user = userEvent.setup()
  render(
    <>
      <InfoHint label="Why buy: Bottles" content={<p>Because babies drink milk.</p>}>
        <h3>Bottles</h3>
      </InfoHint>
      <p>Somewhere else</p>
    </>,
  )
  const button = screen.getByRole('button', { name: 'Why buy: Bottles' })
  return { user, button }
}

describe('InfoHint', () => {
  it('is hidden by default', () => {
    const { button } = setup()
    expect(hint()).not.toBeVisible()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens while hovering the item name and closes on leave', async () => {
    const { user, button } = setup()
    await user.hover(screen.getByRole('heading', { name: 'Bottles' }))
    expect(hint()).toBeVisible()
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.unhover(screen.getByRole('heading', { name: 'Bottles' }))
    expect(hint()).not.toBeVisible()
  })

  it('toggles on click/tap and closes on outside click', async () => {
    const { user, button } = setup()
    await user.click(button)
    await user.unhover(button)
    expect(hint()).toBeVisible()

    await user.click(screen.getByText('Somewhere else'))
    expect(hint()).not.toBeVisible()
  })

  it('opens with the keyboard and closes with Escape', async () => {
    const { user } = setup()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(hint()).toBeVisible()

    await user.keyboard('{Escape}')
    expect(hint()).not.toBeVisible()
  })
})
